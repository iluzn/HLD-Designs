import java.util.*;

class Solution {
    public int removeDuplicates(String s, int k) {
        StringBuilder sb = new StringBuilder();
        int[] counts = new int[s.length()];
        for (int i = 0; i < s.length(); i++) {
            char c = s.charAt(i);
            if (sb.length() > 0 && sb.charAt(sb.length() - 1) == c) {
                counts[sb.length() - 1]++;
                if (counts[sb.length() - 1] == k) sb.deleteCharAt(sb.length() - 1);
            } else {
                sb.append(c);
                counts[sb.length() - 1] = 1;
            }
        }
        return sb.toString();
    }
}
public class Main{public static void main(String[] a){Scanner sc=new Scanner(System.in);int T=Integer.parseInt(sc.nextLine().trim());StringBuilder sb=new StringBuilder();for(int i=0;i<T;i++){String s=sc.hasNextLine()?sc.nextLine():"";int k=Integer.parseInt(sc.hasNextLine()?sc.nextLine().trim():"0");sb.append(new Solution().removeDuplicates(s,k)).append("\n");}System.out.print(sb);}}