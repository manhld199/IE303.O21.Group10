package com.nhom10.forcat.util;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class Util {
    public static String createSlug(String input) {
        String a = "àáäâãåăæąçćčđďèéěėëêęğǵḧìíïîįłḿǹńňñòóöôœøṕŕřßşśšșťțùúüûǘůűūųẃẍÿýźžż·/_,:;";
        String b = "aaaaaaaaacccddeeeeeeegghiiiiilmnnnnooooooprrsssssttuuuuuuuuuwxyyzzz------";

        // Create a pattern for matching special characters in 'a'
        StringBuilder patternStringBuilder = new StringBuilder();
        for (char c : a.toCharArray()) {
            if (patternStringBuilder.length() > 0) {
                patternStringBuilder.append("|");
            }
            patternStringBuilder.append(Pattern.quote(String.valueOf(c)));
        }
        Pattern pattern = Pattern.compile(patternStringBuilder.toString());

        // Convert input to lowercase
        String result = input.toLowerCase();

        // Replace accented characters
        result = result.replaceAll("[áàảạãăắằẳẵặâấầẩẫậ]", "a");
        result = result.replaceAll("[éèẻẽẹêếềểễệ]", "e");
        result = result.replaceAll("[iíìỉĩị]", "i");
        result = result.replaceAll("[óòỏõọôốồổỗộơớờởỡợ]", "o");
        result = result.replaceAll("[úùủũụưứừửữự]", "u");
        result = result.replaceAll("[ýỳỷỹỵ]", "y");
        result = result.replaceAll("[đ]", "d");

        // Replace spaces with hyphens
        result = result.replaceAll("\\s+", "-");

        // Replace special characters using pattern
        Matcher matcher = pattern.matcher(result);
        StringBuffer sb = new StringBuffer();
        while (matcher.find()) {
            char c = matcher.group().charAt(0);
            int index = a.indexOf(c);
            matcher.appendReplacement(sb, index >= 0 ? String.valueOf(b.charAt(index)) : "");
        }
        matcher.appendTail(sb);
        result = sb.toString();

        // Replace & with -and-
        result = result.replaceAll("&", "-and-");

        // Remove all non-word characters except for hyphens
        result = result.replaceAll("[^\\w\\-]+", "");

        // Replace multiple hyphens with a single hyphen
        result = result.replaceAll("\\-\\-+", "-");

        // Trim hyphens from the start and end of the string
        result = result.replaceAll("^-+", "").replaceAll("-+$", "");

        return result;
    }
}
